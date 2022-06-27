import { CoursePart } from "./types";

const Content = ({parts}: {parts: CoursePart[]}) => {
    return(
        <div>
            {parts.map(c => (
                <p>{c.name} {c.exerciseCount}</p> 
            ))}
        </div>

    )
}

export default Content;


