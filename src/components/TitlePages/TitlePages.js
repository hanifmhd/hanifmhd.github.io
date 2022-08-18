import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function TitlePages ({ title }) {
  return (
    <h3 className={classnames('text-[32px] text-primary font-semibold mb-[27px] text-left')}>
        {title}
    </h3>
  )
}
TitlePages.propTypes = {
  title: PropTypes.string
}

export default TitlePages
