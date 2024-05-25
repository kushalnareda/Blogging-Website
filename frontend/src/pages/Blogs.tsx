import { Appbar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className=" max-w-xl">
          {blogs.map((blog) => (
            <BlogCard
              id={1}
              authorName= {blog.author.name || "User"}
              title={blog.title}
              content={blog.content}
              publishedDate="2024-05-25"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
