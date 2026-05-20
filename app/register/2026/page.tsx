import type { Metadata } from 'next';
import Registration2026 from '../../../components/Form/registration2026';

export const metadata: Metadata = {
  title: 'Register | Conference 2026',
  description: 'Register for the AsyncAPI Conference 2026',
};

export default function Register2026() {
  return (
    <div>
      <main className="container mt-20 mb-20">
        <Registration2026 />
      </main>
    </div>
  );
}
