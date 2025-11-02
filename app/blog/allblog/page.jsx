// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SimpleBlogCard from "../../../components/news/blogitems/SimpleBlogCard"; // adjust path
// import { base_api_url } from "../../../config/Config";

// const UserDashboard = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const { data } = await axios.get(`${base_api_url}/api/all/blog`, {
//           next: { revalidate: 5 },
//         });
//         setBlogs(data.blogs || []);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   if (loading) return <p>Loading blogs...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Available Blogs</h2>
//       {blogs.length === 0 ? (
//         <p>No blogs available.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {blogs.map((item) => (
//             <SimpleBlogCard key={item._id} item={item} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;
