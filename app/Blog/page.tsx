import NavBar from '../components/Nav/NavBar';
import Footer from '../components/Foot/Footer';
import Welcome from './components/Welcome';
import PostMenu from './components/PostMenu'

export default function Home() {
    return (
      <div>
        <NavBar />
        <Welcome />
        <PostMenu />
        {/*<CreatePost />*/}
        <Footer />
      </div>
    );
  }