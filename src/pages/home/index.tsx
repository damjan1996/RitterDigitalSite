// src/pages/home/components/index.tsx
import { Hero } from './components/Hero'
import { ServiceTeaser } from './components/ServiceTeaser'
import { Benefits } from './components/Benefits'
import { Clients } from './components/Clients'
import { LatestBlogPosts } from './components/LatestBlogPosts'

export { Hero, ServiceTeaser, Benefits, Clients, LatestBlogPosts }

export const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <ServiceTeaser />
            <Benefits />
            <Clients />
            <LatestBlogPosts />
        </>
    )
}