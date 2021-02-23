import React, { FC, Fragment, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { PathName } from '@/routes'
import './index.less'
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  makeStyles,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Card,
  CardContent,
  CardActions,
  Avatar,
  CardHeader,
} from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { useAsync } from 'react-use'
import { connect } from 'react-redux'
import { RootDispatch, RootState } from '@/store'

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
    width: '100%',
    minHeight: '50px',
  },
  myLiveTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
    '& > span': {
      fontWeight: 'bold',
      lineHeight: 'inherit',
    },
    '& > span:not(:first-child)': {
      marginLeft: '15px',
    },
  },
  pushUrlText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  pushUrl: {
    textDecoration: 'underline',
  },
  enterLiveBtn: {
    marginLeft: 'auto',
  },
}))

const mapState = (state: RootState) => ({
  state: state.liveCenter,
  commonState: state.common,
})
const mapDispatch = (dispatch: RootDispatch) => ({
  dispatch: dispatch.liveCenter,
  commonDispatch: dispatch.common,
})

export type LiveProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps

const Live: FC<LiveProps> = ({
  state,
  commonState,
  dispatch,
  commonDispatch,
  history,
}) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [isRequesting, setIsRequesting] = useState(false)
  const [newLiveDescription, setNewLiveDescription] = useState(
    state?.selfLive?.description || '',
  )
  const [LiveDialogStatus, setLiveDialogStatus] = useState(false)

  useAsync(async () => {
    setLoading(true)
    await dispatch.livesInitialize()
    setLoading(false)
  }, [])

  const createOrEditLive = async () => {
    setIsRequesting(true)
    if (state.selfLive) {
      await dispatch.editLive({
        uid: commonState.userInfo.id as number,
        description: newLiveDescription,
      })
    } else {
      await dispatch.createLive({
        uid: commonState.userInfo.id as number,
        description: newLiveDescription,
      })
    }
    setIsRequesting(false)
    setLiveDialogStatus(false)
  }

  return (
    <div className="bd7-live">
      {/* ========================================================= */}
      {/* ========================= TITLE ========================= */}
      {/* ========================================================= */}

      <div className={classes.toolBar}>
        <Typography variant="subtitle1">直播大厅</Typography>
      </div>
      <Divider />

      {/* =========================================================== */}
      {/* ========================= MY-LIVE ========================= */}
      {/* =========================================================== */}

      <div className="bd7-live__my-live">
        {!loading ? (
          <Fragment>
            <Typography
              className={classes.myLiveTitle}
              color="secondary"
              variant="body2"
            >
              {state.selfLive && (
                <Fragment>
                  <span
                    className={`bd7-live__my-live__status bd7-live__my-live__status--${
                      state.selfLive.isActive ? 'active' : 'deactive'
                    }`}
                  />
                  {state.selfLive.isActive ? (
                    <span
                      className="bd7-live__my-live__text--active"
                      onClick={() => {
                        // TODO: 跳转直播页面
                        console.log('跳转直播页面')
                        // history.push()
                      }}
                    >
                      我的直播间正在直播...
                    </span>
                  ) : (
                    <span>我的直播间</span>
                  )}
                </Fragment>
              )}
            </Typography>
            {state.selfLive ? (
              <div className="bd7-live__my-live--created">
                <div className="bd7-live__my-live--created__left">
                  <Typography variant="subtitle2">
                    直播间描述：
                    <Typography component="span" variant="caption">
                      {state.selfLive.description}
                    </Typography>
                  </Typography>
                  <Typography
                    className={classes.pushUrlText}
                    variant="subtitle2"
                  >
                    推流地址：
                    <Typography
                      className={classes.pushUrl}
                      component="span"
                      variant="caption"
                    >
                      <Link
                        onClick={async (e: any) => {
                          await navigator.clipboard.writeText(e.target.text)
                          commonDispatch.SET_DIALOG({
                            title: '复制推流地址成功',
                            content: e.target.text,
                            status: true,
                          })
                        }}
                      >
                        {state.selfLive.push_url}
                      </Link>
                    </Typography>
                  </Typography>
                </div>
                <div className="bd7-live__my-live--created__right">
                  <Button
                    color="secondary"
                    onClick={() => {
                      setLiveDialogStatus(true)
                    }}
                    size="small"
                    variant="contained"
                  >
                    修改
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bd7-live__my-live--not-created">
                <Typography variant="body1">还没有直播间？</Typography>
                <Button
                  color="secondary"
                  onClick={() => {
                    setLiveDialogStatus(true)
                  }}
                  size="small"
                  variant="contained"
                >
                  点击开通
                </Button>
              </div>
            )}
          </Fragment>
        ) : (
          <div className="bd7-live__my-live--loading">
            <CircularProgress color="inherit" />
          </div>
        )}
      </div>
      <Divider variant="middle" />

      {/* =============================================================== */}
      {/* ========================= LIVE-CENTER ========================= */}
      {/* =============================================================== */}
      {Boolean(state.lives.length) && (
        <div className="bd7-live__center">
          {state.lives.map((live) => (
            <Card className="bd7-live__center__item" key={live.id}>
              <CardHeader
                avatar={
                  <Avatar alt={live.User.username} src={live.User.avatar_url} />
                }
                subheader={live.User.profile || ''}
                title={
                  <Fragment>
                    <span>{live.User.username}</span>
                    <span
                      className={`bd7-live__my-live__status bd7-live__my-live__status--${
                        live.isActive ? 'active' : 'deactive'
                      }`}
                    />
                  </Fragment>
                }
              />
              <CardContent className="bd7-live__center__item__content">
                <Typography color="textSecondary" component="p" variant="body2">
                  {live.description}
                </Typography>
              </CardContent>
              <CardActions
                className="bd7-live__center__item__actions"
                disableSpacing
              >
                <IconButton
                  className={classes.enterLiveBtn}
                  disabled={!live.isActive}
                  onClick={() => {
                    history.push(
                      `${PathName.LIVE_CENTER}/${String(live.User.id)}`,
                    )
                  }}
                >
                  <PlayArrowIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
      {/* ========================================================== */}
      {/* ========================= DIALOG ========================= */}
      {/* ========================================================== */}
      {/* 创建直播间DIALOG */}
      {!loading && (
        <Dialog
          aria-labelledby="form-dialog-title"
          onClose={() => {
            setLiveDialogStatus(false)
          }}
          open={LiveDialogStatus}
        >
          <DialogTitle>
            {state.selfLive ? '修改直播间' : '开通直播间'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              defaultValue={newLiveDescription}
              fullWidth
              label="直播间描述"
              multiline
              onChange={(e) => {
                setNewLiveDescription(e.target.value)
              }}
              placeholder="不可以为空"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={() => {
                setLiveDialogStatus(false)
              }}
            >
              取消
            </Button>
            <Button
              color="secondary"
              disabled={!newLiveDescription || isRequesting}
              onClick={createOrEditLive}
              variant={!newLiveDescription ? 'outlined' : 'contained'}
            >
              {state.selfLive ? '确定' : '开通'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

export default connect(mapState, mapDispatch)(withRouter(Live))
