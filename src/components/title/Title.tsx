
interface TitleProps {
    title: string;
  }

const Title:React.FC<TitleProps> = ({title}) => {
  return (
    <div className="w-full py-5">
         <h3 className="text-[16px] text-slate-600 font-semibold">{title}</h3>
    </div>
  )
}

export default Title
