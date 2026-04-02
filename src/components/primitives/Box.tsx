import React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  display?: React.CSSProperties['display'];
  flexDirection?: React.CSSProperties['flexDirection'];
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
  flexWrap?: React.CSSProperties['flexWrap'];
  flex?: React.CSSProperties['flex'];
  gap?: React.CSSProperties['gap'];
  padding?: React.CSSProperties['padding'];
  paddingTop?: React.CSSProperties['paddingTop'];
  paddingRight?: React.CSSProperties['paddingRight'];
  paddingBottom?: React.CSSProperties['paddingBottom'];
  paddingLeft?: React.CSSProperties['paddingLeft'];
  margin?: React.CSSProperties['margin'];
  marginTop?: React.CSSProperties['marginTop'];
  marginRight?: React.CSSProperties['marginRight'];
  marginBottom?: React.CSSProperties['marginBottom'];
  marginLeft?: React.CSSProperties['marginLeft'];
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  minWidth?: React.CSSProperties['minWidth'];
  minHeight?: React.CSSProperties['minHeight'];
  maxWidth?: React.CSSProperties['maxWidth'];
  maxHeight?: React.CSSProperties['maxHeight'];
  overflow?: React.CSSProperties['overflow'];
  position?: React.CSSProperties['position'];
  top?: React.CSSProperties['top'];
  right?: React.CSSProperties['right'];
  bottom?: React.CSSProperties['bottom'];
  left?: React.CSSProperties['left'];
  backgroundColor?: React.CSSProperties['backgroundColor'];
  borderRadius?: React.CSSProperties['borderRadius'];
  border?: React.CSSProperties['border'];
  boxShadow?: React.CSSProperties['boxShadow'];
  zIndex?: React.CSSProperties['zIndex'];
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  (
    {
      as: Component = 'div',
      display,
      flexDirection,
      alignItems,
      justifyContent,
      flexWrap,
      flex,
      gap,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      overflow,
      position,
      top,
      right,
      bottom,
      left,
      backgroundColor,
      borderRadius,
      border,
      boxShadow,
      zIndex,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const computedStyle: React.CSSProperties = {
      display,
      flexDirection,
      alignItems,
      justifyContent,
      flexWrap,
      flex,
      gap,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      overflow,
      position,
      top,
      right,
      bottom,
      left,
      backgroundColor,
      borderRadius,
      border,
      boxShadow,
      zIndex,
      ...style,
    };

    return (
      <Component ref={ref} style={computedStyle} {...rest}>
        {children}
      </Component>
    );
  },
);

Box.displayName = 'Box';
