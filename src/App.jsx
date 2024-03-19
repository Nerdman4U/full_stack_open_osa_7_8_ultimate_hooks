import { useResource } from './hooks/resourse'
import { useField } from './hooks/field'
import { useEffect } from 'react'

// const useResource = (baseUrl) => {
//   const [resources, setResources] = useState([])

//   // ...

//   const create = (resource) => {
//     // ...
//   }

//   const service = {
//     create
//   }

//   return [
//     resources, service
//   ]
// }

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
    noteService.makeToken(1)
    personService.makeToken(1)
  }, [noteService, personService])

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div className="m-12">
      <h2 className="text-3xl font-semibold text-blue-500">Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2 className="text-3xl font-semibold text-blue-500">persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <table>
          <tbody>
            <tr><td>name </td><td><input {...name} /></td></tr>
            <tr><td>number </td><td><input {...number} /></td></tr>
          </tbody>
        </table>
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App

