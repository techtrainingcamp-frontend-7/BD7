import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, IconButton, List, ListItem } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { io } from 'socket.io-client'
import classNames from 'classnames'
import _ from 'lodash'

import './index.less'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
    position: 'relative',
  },
  message: {
    position: 'absolute',
    left: 15,
    bottom: 15,
    width: '60%',
    display: 'flex',
    alignItems: 'bottom',
    justifyContent: 'center',
  },
  list: {
    maxHeight: 100,
    position: 'absolute',
    left: 15,
    bottom: 100,
    width: '60%',
    overflow: 'auto',
    '-ms-overflow-style': 'none;',
  },
}))

const socket = io()

export const sendMessage = (message: string) => {
  socket.emit('chat message', message)
}

export const Chat = () => {
  const classes = useStyles()
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState<string[]>([])
  const [stopped, setStopped] = useState(false)

  // 收到服务端消息
  socket.on('chat message', (msg: string) => {
    const list = _.cloneDeep(messageList)
    list.push(msg)
    setMessageList(list)
    if (!stopped) document.querySelector('.last-message')?.scrollIntoView(false)
  })

  return (
    <div className={classes.root}>
      <List
        className={classNames('bd7-chat__list', classes.list)}
        onClick={() => {
          setStopped(!stopped)
        }}
      >
        {messageList.length
          ? messageList.map((message, idx) => (
              <ListItem
                className={
                  idx === messageList.length - 1
                    ? 'last-message'
                    : 'chat-list-item'
                }
                key={`${message}${idx}`}
              >
                {message}
              </ListItem>
            ))
          : null}
      </List>
      <form
        autoComplete="off"
        className={classes.message}
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(message)
          setMessage('')
        }}
      >
        <TextField
          fullWidth
          id="send-message"
          label="发送消息"
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          value={message}
        />
        <IconButton
          onClick={() => {
            sendMessage(message)
            setMessage('')
          }}
        >
          <SendIcon color={message ? 'secondary' : 'disabled'} />
        </IconButton>
      </form>
    </div>
  )
}
