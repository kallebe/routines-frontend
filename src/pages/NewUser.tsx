import { registerUser } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NewUser() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(email, password, name);
      navigate('/login');
    } catch (error: any) {
      console.error('Erro ao cadastrar usuário:', error);
      setError(error.response?.data?.error || 'Erro ao cadastrar usuário.');
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
            <CardTitle>Cadastrar</CardTitle>
            <CardDescription>
              Por favor, preencha os campos para cadastrar a sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Nome</Label>
                <Input
                  id="name"
                  placeholder='Ex: Jurandismar Santana'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
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
                <Label htmlFor="password">Senha</Label>
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
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
            <div className="mt-4 text-center text-sm">
              Já possui uma conta?{' '} <Link to="/login" className="underline underline-offset-4">Entrar</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default NewUser;
