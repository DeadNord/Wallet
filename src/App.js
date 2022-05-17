import { Fragment, useEffect } from 'react'
// import { OpenMenu } from 'modules'
import { Routes, Route, Link, NavLink, Outlet, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { selectorsGlobal } from 'store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ROUTES } from 'lib'
import { Header, Home, Logout } from 'modules'
import { Modal } from 'modules'
// import { Logo } from 'modules'
// import { ButtonAddTransactios } from 'modules'
import { setIsModalLogoutOpen } from 'store'
import { setIsModalAddTransactionOpen } from 'store'
import { setIsLoading } from 'store'

import { Button } from 'modules'
// import { Currency } from 'modules'
import { Balance } from 'modules'
import { CustomLoader } from 'modules'
import { Navigation } from 'modules/components/Navigation'
import { fetchCategories } from 'store'
import { selectorsFinance } from 'store'
// import {ChartSection } from './modules'
// const Button = styled.button`
// 	background: black;
// 	height: 50px;
// 	width: 200px;
// 	color: yellow;
// 	margin-bottom: 5px;
// 	&:hover {
// 		background: grey;
// 	}
// `
// selectorsFinance
export default function App() {
	const isLoading = useSelector(selectorsGlobal.getIsLoading)
	const isModalLogOut = useSelector(selectorsGlobal.getIsModalLogoutOpen)
	const isModalAddTransaction = useSelector(selectorsGlobal.getIsModalAddTransactionOpen)
	const categories = useSelector(selectorsFinance.getCategories)
	console.log(categories)
	const dispatch = useDispatch()
	const showModalLogout = () => {
		dispatch(setIsModalLogoutOpen(true))
	}
	const showModalAddTransaction = () => {
		dispatch(setIsModalAddTransactionOpen(true))
	}
	const checkLoader = () => {
		dispatch(setIsLoading(!isLoading))
	}

	useEffect(() => dispatch(fetchCategories()), [])

	return (
		<Fragment>
			{isModalLogOut && (
				<Modal>
					<Logout name='Bayraktar' />
				</Modal>
			)}
			<Header />
			{/* <OpenMenu /> */}
			{/* <ButtonAddTransactios /> */}
			<Outlet />

			{isModalLogOut && (
				<Modal>
					<Logout />
				</Modal>
			)}
			{isModalAddTransaction && (
				<Modal>
					<Balance />
				</Modal>
			)}

			<ToastContainer autoClose={2000} />
			<Routes>
				<Route>
					<Route path='/' element={<Navigate to={ROUTES.HOME} />} />
					<Route
						path={ROUTES.HOME}
						element={
							<>
								<Home page={ROUTES.HOME} /> <Outlet />
							</>
						}
					/>
					<Route
						path={ROUTES.DIAGRAM}
						element={
							<>
								<Home page={ROUTES.DIAGRAM} /> <Outlet />
							</>
						}
					/>
					<Route
						path={ROUTES.CURRENCY}
						element={
							<>
								<Home page={ROUTES.CURRENCY} /> <Outlet />
							</>
						}
					/>
					<Route
						path='*'
						element={
							<main style={{ padding: '1rem', color: 'red' }}>
								<p>page not found</p>
								<Outlet />
							</main>
						}
					/>
				</Route>
			</Routes>

			{isLoading && <CustomLoader />}
		</Fragment>
	)
}
