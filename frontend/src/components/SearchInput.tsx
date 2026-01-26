import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { selectSearchQuery, setSearchQuery } from '../redux/searchSlice'

export default function SearchInput() {
  const searchQuery = useAppSelector(selectSearchQuery)
  const dispatch = useAppDispatch()

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd" />
          </svg>
        </span>
        <input
          type="search"
          className="w-full rounded-lg border border-neutral-300 bg-white py-2 pl-10 pr-4 text-neutral-700 placeholder-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Search songs..."
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>
    </div>
  )
}
