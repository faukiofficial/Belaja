import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { getCategories, getFAQ } from '../../../../redux/slices/layoutSlice'

const Settings = () => {
    const dispatch = useAppDispatch()
    const {faq, categories} = useAppSelector((state) => state.layout)

    useEffect(() => {
        dispatch(getFAQ({type: "FAQ"}))
        dispatch(getCategories({type: "Categories"}))
    }, [dispatch])

    console.log("faq", faq)
    console.log("categories", categories)
  return (
    <div>Settings</div>
  )
}

export default Settings