import './render-buttons.css'
import usersStore from '../../store/user-store'
import { renderTable } from '../render-table/render-table'

/**
 * @param {HTMLDivElement} element 
 */
export const renderButtons = (element) => {

    const nextButton = document.createElement('button')
    nextButton.innerText = 'Next >'

    const prevButton = document.createElement('button')
    prevButton.innerText = '< Prev'

    const currentPageLabel = document.createElement('span')
    currentPageLabel.id = 'current-page'
    currentPageLabel.innerText = usersStore.getCurrentPage()

    element.append( prevButton, currentPageLabel, nextButton )

    nextButton.addEventListener('click', async() => {
        await usersStore.loadNextPage()
        currentPageLabel.innerText = usersStore.getCurrentPage()
        renderTable(element)
    })

    prevButton.addEventListener('click', async() => {
        await usersStore.loadPreviusPage()
        currentPageLabel.innerText = usersStore.getCurrentPage()
        renderTable(element)
    })
}