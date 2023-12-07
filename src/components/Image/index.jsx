import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

let observer = null

const LOAD_IMG_EVENT_TYPE = 'loadImage'

const onIntersecrtion = (entries, io) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 3. 만약 뷰포트에 들어왔다면
      io.unobserve(entry.target)
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE)) // 4. 지정한 이벤트를 호출
    }
  })
}

const Image = ({
  lazy,
  threshold = 0.5,
  placeholder,
  src,
  width,
  block,
  height,
  alt,
  mode,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)
  const imageStyle = {
    display: block ? 'block' : undefined,
    width,
    height,
    objectFit: mode
  }

  useEffect(() => {
    if (!lazy) {
      setLoaded(true)
      return
    }

    const handleLoadImage = () => setLoaded(true) // 6. 이벤트 호출해서 loaded 값 true

    const imgElement = imgRef.current
    imgElement &&
      imgElement.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage) // 5.5 이벤트가 등록되어있음
    return () => {
      imgElement &&
        imgElement.removeEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage)
    }
  }, [lazy])

  useEffect(() => {
    if (!lazy) return
    observer = new IntersectionObserver(onIntersecrtion, { threshold }) // 1. 옵저버 생성

    imgRef.current && observer.observe(imgRef.current) // 2. img 감시
  }, [lazy, threshold])

  return (
    <img
      ref={imgRef}
      src={loaded ? src : placeholder} // 7. loaded값에 따라 이미지나 placeholder을 보여줌
      style={{ ...props.style, ...imageStyle }}
      alt={alt}
    />
  )
}

Image.propTypes = {
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  placeholder: PropTypes.string,
  src: PropTypes.string.isRequired,
  block: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
  mode: PropTypes.oneOf(['cover', 'fill', 'contain']),
  style: PropTypes.object
}

export default Image
