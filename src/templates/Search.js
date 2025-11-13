import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TagCloud from '../components/TagCloud'
import { search } from '../utils/wp'
import PostGrid from '../components/PostGrid'
import Box from '../components/primitives/Box'

const cleanSearch = (str) => {
  return str.replace(/[^a-zA-Z0-9\-_+ ]/g, '')
}

const Search = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searching, setSearching] = useState(false)
  const [placeholderText, setPlaceholderText] = useState('Søk')

  const input = useRef(null)
  const autoQueryTimer = useRef(null)
  const inputFocusTimer = useRef(null)

  const doSearch = useCallback((searchValue) => {
    const valueToSearch = searchValue !== undefined ? searchValue : inputValue
    const cleanedSearchTerm = cleanSearch(valueToSearch)
    if (!cleanedSearchTerm) {
      setSearching(false)
      setSearchTerm('')
      setPosts([])
      setInputValue('')
      navigate('/sok', { replace: true })
    } else {
      setSearching(true)
      search(cleanedSearchTerm)
        .then((posts) => {
          setPosts(posts)
          setSearchTerm(valueToSearch)
          setSearching(false)
          // Add url parameter for successful search to make it possible to share results
          navigate(`/sok/${cleanedSearchTerm}`, { replace: true })
        })
        .catch((err) => {
          console.log('err', err)
          setPosts([])
          setSearchTerm(valueToSearch)
          setSearching(false)
          navigate('/sok', { replace: true })
        })
    }
  }, [inputValue, navigate])

  const handleSubmit = (event) => {
    if (autoQueryTimer.current) {
      clearTimeout(autoQueryTimer.current)
    }

    doSearch()

    event.preventDefault()
  }

  const handleChange = (event) => {
    const query = event.target.value

    setInputValue(query)

    if (autoQueryTimer.current) {
      clearTimeout(autoQueryTimer.current)
    }
    autoQueryTimer.current = setTimeout(() => {
      doSearch()
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (inputFocusTimer.current) {
        clearTimeout(inputFocusTimer.current)
      }
      if (autoQueryTimer.current) {
        clearTimeout(autoQueryTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    inputFocusTimer.current = setTimeout(() => {
      input.current?.focus()
    }, 300)

    // Search on initial load based on query
    if (params.query) {
      setInputValue(params.query)
      // Use a small delay to ensure state is set before searching
      setTimeout(() => {
        doSearch(params.query)
      }, 100)
    }
  }, [params.query, doSearch])

  const clearSearch = () => {
    setInputValue('')
    setTimeout(() => {
      doSearch()
    }, 0)
  }

  const inputFocus = () => {
    setPlaceholderText('Begynn å skrive for å søke')
  }

  const inputBlur = () => {
    setPlaceholderText('Søk')
  }

  return (
    <article className="Search container">
      <form className="Search__form" onSubmit={handleSubmit}>
        <label>
          <input
            ref={input}
            className="Search__input"
            placeholder={placeholderText}
            onFocus={inputFocus}
            onBlur={inputBlur}
            onChange={handleChange}
            type="text"
            value={inputValue}
          />
        </label>
        {inputValue && (
          <button className="Search__clear" onClick={clearSearch}>
            &times;
          </button>
        )}
      </form>
      {searching && <div className="Search__status">Et øyeblikk…</div>}
      {posts.length ? (
        <Box mb={5}>
          <PostGrid posts={posts} />
        </Box>
      ) : (
        searchTerm && (
          <div className="Search__status">
            Ingen innlegg funnet for <strong>{searchTerm}</strong>
          </div>
        )
      )}
      {!searching && !posts.length && !inputValue.length && (
        <>
          <TagCloud className="Search__tags" />
        </>
      )}
    </article>
  )
}

export default Search
