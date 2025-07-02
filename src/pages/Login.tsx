import { useEffect, useState } from 'react';
import { login } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Routine | Entrar';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      navigate('/');
    } catch (error) {
      setError(`Erro ao fazer login: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }

    setLoading(false);
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background: 'linear-gradient(135deg, var(--main) 15%, var(--chart-3) 100%)',
      }}
    >
      <Card className='w-md max-w-full mx-auto'>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Por favor, insira suas credenciais para acessar sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder='k@exemplo.com'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex flex-items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder='********'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                {error && (
                  <div className="text-red-600 text-sm text-center">{error}</div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-4'>
            <Button type='submit' className='w-full' onSubmit={handleSubmit} disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            <div className="mt-4 text-center text-sm">
              Não possui uma conta?{' '}<Link to="/new-user" className="underline underline-offset-4">Cadastre-se</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Login;