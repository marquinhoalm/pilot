import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './style.css'
import Transition from '../Transition'

const Loader = ({
  label,
  position,
  text,
  visible,
}) => {
  const overlayStyle = classNames(
    style.overlay,
    style.loaderOverlay,
    style.highZIndex,
    style[position]
  )

  return (
    <Transition
      atEnter={{
        opacity: 0.3,
        zIndex: 10,
      }}
      atLeave={{
        opacity: 0,
        zIndex: -1,
      }}
      atActive={{
        opacity: 1,
        zIndex: 10,
      }}
      className={style.overlay}
      springOptions={{
        stiffness: 170,
        damping: 26,
        precision: 0.01,
      }}
    >
      {visible &&
        <div
          className={overlayStyle}
          key="overlay"
        >
          <div
            aria-busy="true"
            aria-label={label}
            className={style.loader}
            role="progressbar"
          />
          <h4 className={style.text}>{text}</h4>
        </div>
      }
    </Transition>
  )
}

Loader.propTypes = {
  label: PropTypes.string,
  position: PropTypes.oneOf(['fixed', 'absolute']),
  text: PropTypes.string,
  visible: PropTypes.bool,
}

Loader.defaultProps = {
  label: 'Loading',
  position: 'fixed',
  text: '',
  visible: false,
}

export default Loader
