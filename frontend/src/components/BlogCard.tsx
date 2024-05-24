interface BlogCardProps {
    authorName: string;
    title : string;
    content : string;
    publisedDate : string;
}

export const BlogCard= ({
    authorName,
    title,
    content,
    publisedDate
}: BlogCardProps)=>{
    return (
        <div>
            Blog
        </div>
    )
}