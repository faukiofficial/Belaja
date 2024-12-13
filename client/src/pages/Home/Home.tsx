import Footer from '../../components/Footer'
import Header from '../../components/Header'
// import Hero from './components/Hero'
import CobaHero from './components/CobaHero'
import HomeCourses from './components/HomeCourses'
import HomeFAQ from './components/HomeFAQ'
import HomeReviews from './components/HomeReviews'

const Home = () => {
  return (
    <div>
        <Header />
        {/* <Hero /> */}
        <CobaHero/>
        <HomeCourses />
        <HomeReviews />
        <HomeFAQ />
        <Footer/>
    </div>
  )
}

export default Home