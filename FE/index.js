const socket = io('http://localhost:3000')

let messages = []
let toId = ''
const token = localStorage.getItem('token')

socket.emit('updateSocketId', { token })

socket.on('retrieveMessages', (data) => {
	messages = data.messages
	console.log(data.messages)
	displayMessages()
})

socket.on('newMessage', (data) => {
	const { to, from } = data.message
	console.log({ to, from })
	if (to.toString() === toId || from.toString() === toId) {
		messages.push(data.message)
		displayMessages()
	}
})

const displayMessages = () => {
	const chatArea = document.querySelector('#chat-area')
	chatArea.innerHTML = ''
	messages.forEach((message) => {
		const card = document.createElement('div')
		card.className = 'card text-left'

		const cardBody = document.createElement('div')
		cardBody.className = 'card-body'

		const cardP = document.createElement('p')
		cardP.className = 'card-text'
		cardP.textContent =
			(message.to === toId ? 'You : ' : 'Them : ') + message.text

		cardBody.appendChild(cardP)
		card.appendChild(cardBody)
		chatArea.appendChild(card)
	})
}

const handleStartChat = (event) => {
	event.preventDefault()
	const formData = new FormData(event.target)
	const userId = formData.get('user-id')
	toId = userId

	socket.emit('getMessages', { token, to: toId })
}

const handleSendMessage = (event) => {
	event.preventDefault()
	const formData = new FormData(event.target)
	const message = formData.get('message')

	formData.set('message', '')

	socket.emit('addMessage', { token, to: toId, message })
}
