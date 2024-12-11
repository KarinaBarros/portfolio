import '@/app/globals.css';
import '@/styles/sobre.css';
import Github from "@/components/github/github";
import Nav from "@/components/nav/nav";

export default function Sobre() {
    return (
        <>
            <Nav />
            <div className="sobre">
                <Github />
            </div>
        </>
    )
}