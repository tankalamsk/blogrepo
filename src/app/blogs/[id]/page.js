import Display from "@/components/Display";


const getData = async (id) => {
    const res = await fetch(`http://localhost:1337/api/blogs?populate=thumbnail&filters[$and][0][id][$eq]=${id}`);
    const data = await res.json(); // Extract JSON data from the response
    return data; // Return the JSON data
}

export default async function Id({ params }) {
    try {
        const data = await getData(params.id); // Await the result of getData
        return (
            <div>
                {data.data.map((blog) => (
                    <div key={blog.id} style={{width:"100%"}}>
                        <Display imageurl = {"http://localhost:1337"+blog.attributes.thumbnail.data.attributes.formats.thumbnail.url}
                                 topic = { blog.attributes.topic}
                                 content = { blog.attributes.content}
                                 date = {blog.attributes.date}
                                 category={blog.attributes.category}
                                 description={blog.attributes.description}
                        />
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error('Error fetching data:', error); // Log any errors that occur during fetching
        return (
            <div>
                <p>Error fetching data</p> {/* Display an error message if fetching fails */}
            </div>
        );
    }
}
