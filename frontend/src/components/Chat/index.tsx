import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, IconButton, List, ListItem, Link } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { Socket } from 'socket.io-client'
import classNames from 'classnames'

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

export interface ChatProps {
  socket: Socket
  username: string
  onChatInfoClick: any
}

interface ChatInfo {
  username: string
  message: string
}

let _messageList: ChatInfo[] = []
export const Chat: React.FC<ChatProps> = ({
  socket,
  username,
  onChatInfoClick,
}) => {
  const classes = useStyles()
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState<ChatInfo[]>([])
  const [stopped, setStopped] = useState(false)
  const sendMessage = (socket: Socket, message: string): void => {
    socket.emit('chat', JSON.stringify({ message, username }))
  }
  const recieveMessage = (chatInfo: ChatInfo) => {
    const newMessageList = [..._messageList, chatInfo] as ChatInfo[]
    setMessageList(newMessageList)
    _messageList = newMessageList
    if (!stopped) document.querySelector('.last-message')?.scrollIntoView(false)
  }
  // 收到服务端消息
  useEffect(() => {
    socket.on('chat', (payload: string) => {
      recieveMessage(JSON.parse(payload) as ChatInfo)
    })
    return () => {
      socket.off('chat')
    }
  }, [])

  return (
    <div className={classes.root}>
      <List
        className={classNames('bd7-chat__list', classes.list)}
        onClick={() => {
          setStopped(!stopped)
        }}
      >
        {messageList.length
          ? messageList.map((chatInfo, idx) => (
              <ListItem
                className={
                  idx === messageList.length - 1
                    ? 'last-message'
                    : 'chat-list-item'
                }
                key={`${chatInfo.username}-${chatInfo.message}-${idx}`}
              >
                <Link
                  onClick={() => {
                    onChatInfoClick(chatInfo.username)
                  }}
                >
                  {chatInfo.username}
                </Link>
                : {chatInfo.message}
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
          sendMessage(socket, message)
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
            sendMessage(socket, message)
            setMessage('')
          }}
        >
          <SendIcon color={message ? 'secondary' : 'disabled'} />
        </IconButton>
      </form>
    </div>
  )
}
