import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";
//pages
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/User/Profile";
import MyPosts from "./components/pages/Post/MyPosts";
import AddPost from "./components/pages/Post/AddPost";
import PostDetails from "./components/pages/Post/PostDetails";

//contextos
//abraça todos componentes dando a possibildiade de acessarem o contexto do usuario
import { UserProvider } from "./context/UserContext";
import EditPost from "./components/pages/Post/EditPost";
import MyAdoptions from "./components/pages/Post/MyAdoptions";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/post/myposts" element={<MyPosts />} />
            <Route path="/post/add" element={<AddPost />} />
            <Route path="/post/edit/:id" element={<EditPost />} />
            <Route path="/post/myadoptions" element={<MyAdoptions />} />
            <Route path="/post/:id" element={<PostDetails />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
