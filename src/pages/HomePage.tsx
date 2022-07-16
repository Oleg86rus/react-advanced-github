import React, {useEffect, useState} from 'react'
import {useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";

export function HomePage() {
  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const debounced = useDebounce(search)
  const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3
  })

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0)
    console.log(search)
  },[debounced, data])

    return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      {isError && <p className='text-center text-red-600'>Что-то пошло не так...</p>}
      <div className='relative w-[560px]'>
        <input
            type="text"
            className='border py-2 px-4 w-full h-[42px] mb-2'
            placeholder='Найти пользователя на Github...'
            value={search}
            onChange={e=>setSearch(e.target.value)}
        />
        { dropdown && <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
          {isLoading && <p className='text-center'>Загрузка...</p>}
          {data?.map(user => (
              <li
                  key={user.id}
                  className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
              >{ user.login }</li>
          ))}
        </ul>}
      </div>
    </div>
  )
}