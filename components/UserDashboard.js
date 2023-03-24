import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import TodoCard from './TodoCard'
import { doc, setDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'
import useFetchTodos from '../hooks/fetchTodos'
import Header from './Header'

export default function UserDashboard() {
    const { userInfo, currentUser } = useAuth()
    const [edit, setEdit] = useState(null)
    const [todo, setTodo] = useState('')
    const [edittedValue, setEdittedValue] = useState('')

    const { todos, setTodos, loading, error } = useFetchTodos()



    console.log(todos)

    // useEffect(() => {
    //     if (!userInfo || Object.keys(userInfo).length === 0) {
    //         setAddTodo(true)
    //     }
    // }, [userInfo])

    async function handleAddTodo() {
        if (!todo) { return }
        const newKey = Object.keys(todos).length === 0 ? 1 : Math.max(...Object.keys(todos)) + 1
        setTodos({ ...todos, [newKey]: todo })
        const userRef = doc(db, 'group_info', currentUser.uid)
        await setDoc(userRef, {
            'todos': {
                [newKey]: todo
            }
        }, { merge: true })
        setTodo('')
    }

    async function handleEditTodo() {
        if (!edittedValue) { return }
        const newKey = edit
        setTodos({ ...todos, [newKey]: edittedValue })
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(userRef, {
            'todos': {
                [newKey]: edittedValue
            }
        }, { merge: true })
        setEdit(null)
        setEdittedValue('')
    }

    function handleAddEdit(todoKey) {
        return () => {
            console.log(todos[todoKey])
            console.log('bannan')
            setEdit(todoKey)
            setEdittedValue(todos[todoKey])
        }
    }

    function handleDelete(todoKey) {
        return async () => {
            const tempObj = { ...todos }
            delete tempObj[todoKey]

            setTodos(tempObj)
            const userRef = doc(db, 'users', currentUser.uid)
            await setDoc(userRef, {
                'todos': {
                    [todoKey]: deleteField()
                }
            }, { merge: true })

        }
    }

    return (
        <>
        <Header/>

   
        <div className='w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col flex-1 py-4 gap-3 sm:gap-5'>
            
            
            <div className='flex items-stretch'>
                <label className='text-1xl sm:text-2xl'>Member Name</label>
            </div>

            <div className='flex items-stretch'>
                <input type='text' placeholder="Full Name" value={todo} onChange={(e) => setTodo(e.target.value)} className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1" />
                </div>

            <div className='flex items-stretch'>
                <label className='text-1xl sm:text-2xl'>Phone Number 1</label>
            </div>

            <div className='flex items-stretch'>
                <input type='text' placeholder="Full Name" value={todo} onChange={(e) => setTodo(e.target.value)} className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1" />
                 </div>

            <div className='flex items-stretch'>
                <label className='text-1xl sm:text-2xl'>Phone Number 2</label>
            </div>

            <div className='flex items-stretch'>
                <input type='text' placeholder="Full Name" value={todo} onChange={(e) => setTodo(e.target.value)} className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1" />
                 </div>

            <button onClick={handleAddTodo} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                <h2 className='relative z-20'>
                    Add Contact
                </h2>
            </button>

           

            {(loading) && (<div className='flex-1 grid place-items-center'>
                <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
            </div>)}
            {(!loading) && (
                <>
                    {Object.keys(todos).map((todo, i) => {
                        return (
                            <TodoCard handleEditTodo={handleEditTodo} key={i} handleAddEdit={handleAddEdit} edit={edit} todoKey={todo} edittedValue={edittedValue} setEdittedValue={setEdittedValue} handleDelete={handleDelete}>
                                {todos[todo]}
                            </TodoCard>
                        )
                    })}
                </>
            )}
            {/* {!addTodo && <button onClick={() => setAddTodo(true)} className='text-cyan-300 border border-solid border-cyan-300 py-2 text-center uppercase text-lg duration-300 hover:opacity-30'>ADD TODO</button>} */}
        </div>
        </>
    )
}
