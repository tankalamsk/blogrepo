import Card from "./Card"
import "./Dashboard.css"

const getBlogs = async () => {
    const baseUrl = process.env.BASE_URL;
    const res = await fetch(baseUrl + 'blogs?populate=thumbnail',{cache:"no-store"});
    return res.json();
}

export default async function Dashboard({}) {
    const blogs = await getBlogs();

    
    return (
        <div className="grid-container">
            {blogs && blogs.data.map(blog => (
                <Card 
                    className ="grid-item"
                    key={blog.id} 
                    id={blog.id}
                    topic={blog.attributes.topic} 
                    date={blog.attributes.date} 
                    content={blog.attributes.content} 
                    category={blog.attributes.category} 
                    description={blog.attributes.description} 
                    thumbnail = {process.env.BASE_URL_SHT+blog.attributes.thumbnail.data.attributes.url}
                />
            ))}
        </div>
    )
}
