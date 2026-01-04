import { projects } from '@/lib/projects';
import ProjectContent from './ProjectContent';

// Generate static params for all projects
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default function Page({ params }: { params: { slug: string } }) {
    return <ProjectContent params={params} />;
}
