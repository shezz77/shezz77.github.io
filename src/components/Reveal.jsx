import { useInView } from '../hooks/useInView'

// Wraps content in the scroll-reveal animation. Renders as a <div> by default;
// pass `as` to use another element/tag.
export default function Reveal({ as: Tag = 'div', className = '', style, children, ...rest }) {
  const [ref, inView] = useInView()
  const classes = ['reveal', inView ? 'is-visible' : '', className].filter(Boolean).join(' ')

  return (
    <Tag ref={ref} className={classes} style={style} {...rest}>
      {children}
    </Tag>
  )
}
