import React from 'react'

const Button = ({ classes, variant, children, ...props }) => {
  const baseStyles = "font-semibold py-2 px-4 rounded-lg";
  const primaryStyles = "text-white bg-primary-color border border-primary-color";
  const secondaryStyles = "bg-white text-black border border-black";
  const variantStyles = variant === 'primary' ? primaryStyles : secondaryStyles;

  return (
    <button {...props} className={`${baseStyles} ${variantStyles} ${classes}`}>
      {children}
    </button>
  )
}

export default Button
