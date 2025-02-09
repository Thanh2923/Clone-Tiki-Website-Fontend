interface VideoProps {
  className?: string; // className là một chuỗi và có thể là tùy chọn
}

export const Video:React.FC<VideoProps> = ({className}) => {
  return (
    <div className={`${className}`}>
          <div className="h-[500px]">
            <video className="w-full h-full" autoPlay loop muted>
              <source src="/video/video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
  )
}
