import { FormEvent, useState } from 'react'
import styled from 'styled-components'
import { api } from '@/services/api'
import { Link, useNavigate } from 'react-router-dom'



const Card = styled.form`
  max-width: 680px;
  margin: 1rem auto;
  display: grid;
  gap: .75rem;
  border: 1px solid ${({theme}) => theme.colors.border};
  background: ${({theme}) => theme.colors.card};
  padding: 1.2rem;
  border-radius: ${({theme}) => theme.radius};
`
const Field = styled.div`
  display: grid; gap: .25rem;
  input, textarea {
    padding: .7rem .9rem;
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.border};
    background: #ffff;
    color: ${({theme}) => theme.colors.text};
  }
  textarea { min-height: 220px; }
`
const ButtonLink = styled(Link)`
 display: inline-block;
 padding: .8rem 1rem;
 border-radius: 12px;
 border: 1px solid ${({theme}) => theme.colors.border};
 background: #ff4757;
 color: #fff;
 font-weight: 600;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
`;

const Row = styled.div` display: flex; gap: .75rem; `
const Button = styled.button`
  padding: .8rem 1rem;
  border-radius: 12px;
  border: 1px solid ${({theme}) => theme.colors.border};
  background: ${({theme}) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
`

export function PostCreate() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [disciplina, setDisciplina] = useState(''); 
  const [turma, setTurma] = useState(''); 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      const post = await api.createPost({ title, author, content })
      navigate(`/post/${post.id}`)
    } catch (err: any) {
      setError(err.message || 'Falha ao criar post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card onSubmit={onSubmit}>
      <h2>Nova Atividade</h2>
      <Field>
        <label htmlFor="title">Título</label>
        <input id="title" value={title} onChange={e=>setTitle(e.target.value)} required />
      </Field>
      <Field>
        <label htmlFor="author">Autor</label>
        <input id="author" value={author} onChange={e=>setAuthor(e.target.value)} required />
      </Field>
      <Field>
        <label htmlFor="disciplina">Disciplina</label>
        <input id="disciplina" value={disciplina} onChange={e => setDisciplina(e.target.value)} required />
      </Field>
      <Field>
        <label htmlFor="turma">Turma</label>
        <input id="turma" value={turma} onChange={e => setTurma(e.target.value)} />
      </Field>
      <Field>
        <label htmlFor="content">Conteúdo</label>
        <textarea id="content" value={content} onChange={e=>setContent(e.target.value)} required />
      </Field>
      {error && <p role="alert" style={{color:'#ff8080'}}>{error}</p>}
      <Row>
        <Button disabled={loading}>{loading ? 'Enviando...' : 'Publicar'}</Button>
        <ButtonLink to="/posts">Voltar</ButtonLink>
      </Row>
    </Card>
  )
}
