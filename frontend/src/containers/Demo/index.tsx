import React, { FC } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { RootDispatch, RootState } from '@/store'
import './index.less'

const mapState = (state: RootState) => ({
  state: state.demo,
})
const mapDispatch = (dispatch: RootDispatch) => ({
  dispatch: dispatch.demo,
})
export type DemoProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps

const Demo: FC<DemoProps> = ({ state, dispatch, history }) => {
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
      <button
        className="demo-button"
        onClick={async () => {
          await dispatch.getTestAPI()
        }}
      >
        Fetch Test API
      </button>
      {state.players.length ? (
        <ol>
          {state.players.map((player) => (
            <div className="demo-player" key={player.id}>
              {player.id}, {player.first_name}
            </div>
          ))}
        </ol>
      ) : null}
      {state.testAPTResult ? (
        <pre>{JSON.stringify(state.testAPTResult, null, 2)}</pre>
      ) : null}
    </div>
  )
}

export default connect(mapState, mapDispatch)(withRouter(Demo))
