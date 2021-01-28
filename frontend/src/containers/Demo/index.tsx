import React, { FC } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Dispatch, RootState } from '@/store'
import './index.less'

const mapState = (state: RootState) => ({
  state: state.demo,
})
const mapDispatch = (dispatch: Dispatch) => ({
  dispatch: dispatch.demo,
})
export type HomeProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps

const Demo: FC<HomeProps> = ({ state, dispatch, history }) => {
  return (
    <div className="demo">
      <div className="demo-route">当前路由：{history.location.pathname}</div>
      <div>
        <button
          className="demo-button"
          onClick={() => {
            dispatch.SET_COUNT(state.count + 1)
          }}
        >
          Add count
        </button>
        <button
          className="demo-button"
          onClick={() => {
            dispatch.SET_COUNT(state.count - 1)
          }}
        >
          Minus Count
        </button>
        <div className="demo-counter">counter {state.count}</div>
      </div>
      <button
        className="demo-button"
        onClick={async () => {
          await dispatch.getPlayers()
        }}
      >
        Fetch Players
      </button>
      {state.players.length ? (
        <ol>
          {state.players.map((player) => (
            <div key={player.id} className="demo-player">
              {player.id}, {player.first_name}
            </div>
          ))}
        </ol>
      ) : null}
    </div>
  )
}

export default connect(mapState, mapDispatch)(withRouter(Demo))
