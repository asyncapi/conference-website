import Head from 'next/head';
import Header from '../../../components/Header/header';
import Registration2026 from '../../../components/Form/registration2026';

export default function Register2026() {
    return (
        <div>

            <main className="container mt-20 mb-20">
                <Registration2026 />
            </main>

            {/* Footer is rendered globally in pages/_app.tsx; avoid duplicate here */}
        </div>
    );
}
