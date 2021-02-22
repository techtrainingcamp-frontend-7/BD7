// in src/MyUrlField.js
import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LaunchIcon from '@material-ui/icons/Launch'
import { FieldProps } from 'react-admin'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
  },
  icon: {
    width: '0.5em',
    paddingLeft: 2,
  },
})

export const MyUrlField: React.FC<FieldProps> = ({ record, source }) => {
  const classes = useStyles()
  if (!record || !source || !record[source]) return null
  return (
    <a
      className={classes.link}
      href={record[source]}
      rel="noreferrer"
      target="_blank"
    >
      {record[source]}
      <LaunchIcon className={classes.icon} />
    </a>
  )
}
