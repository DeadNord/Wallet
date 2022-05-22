import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import FormHelperText from '@material-ui/core/FormHelperText'
import NativeSelect from '@material-ui/core/NativeSelect'
import { Formik, ErrorMessage, Field, useFormik } from 'formik'
import Datetime from 'react-datetime'
import { OpenMenu } from '../OpenMenu'
// import OpenMenu from '../OpenMenu'
import { Button } from 'modules'
import { Checkbox } from 'modules/common'
import styled from 'styled-components'
import * as Yup from 'yup'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled'
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled'
import PopperUnstyled from '@mui/base/PopperUnstyled'

import {
	setCloseModal,
	selectorsFinance,
	fetchTotalFinance,
	fetchFinance,
	resetFinance,
	addTransaction as zuzuzu,
} from 'store'
import authOperations from '../../../../src/store/auth/auth-operations'

import { vars } from 'stylesheet'
import { sprite } from 'assets'
import 'react-datetime/css/react-datetime.css'

import Box from '@mui/material/Box'

////////////

/////////////
const StyledInput = styled.input`
	box-sizing: border-box;
	width: 100%;

	font-size: 18px;
	line-height: 1.5;
	border-bottom: 1px solid ${vars.color.accent.buttonOpenMenu};

	&::placeholder {
		color: ${vars.color.font.third};
	}
`

const SummInput = styled(StyledInput)`
	font-weight: 700;
	text-align: center;

	&::placeholder {
		text-align: center;
	}

	&.error {
		border-color: ${vars.color.font.negative};
	}

	@media screen and (min-width: 768px) {
		margin-right: 30px;
	}
`

const StyledGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 40px;

	span {
		width: 100%;
		position: relative;
	}

	svg {
		position: absolute;
		top: 2px;
		right: 10px;
	}

	@media screen and (min-width: 768px) {
		flex-wrap: nowrap;
	}
`

const StyledTextarea = styled.textarea`
	box-sizing: border-box;
	margin-bottom: 40px;
	padding-left: 20px;

	width: 100%;
	height: 86px;
	font-size: 18px;
	line-height: 1.5;
	border-bottom: 1px solid ${vars.color.accent.buttonOpenMenu};
	resize: none;

	&::placeholder {
		color: ${vars.color.font.third};
	}

	@media screen and (min-width: 768px) {
		height: 32px;
	}
`
const Title = styled.h2`
	font-family: 'Poppins';
	font-weight: 400;
	font-size: 24px;
	line-height: 1.5;
	text-align: center;
	margin-bottom: 40px;

	@media screen and (min-width: 768px) {
		font-size: 30px;
	}
`

const theme = createTheme({
	overrides: {
		// Style sheet name ⚛️
	},
})

const FormContainer = styled.div`
	padding: 20px 10px;
	padding-bottom: 0;
	width: 100vw;

	font-size: 18px;
	line-height: 1.5;
	text-align: center;

	@media screen and (min-width: 768px) {
		padding: 40px 75px;
		width: 540px;
		min-height: 605px;
	}

	.form-control {
		padding-left: 20px;

		width: 100%;
		font-size: 18px;
		line-height: 1.5;
		border-bottom: 1px solid ${vars.color.accent.buttonOpenMenu};
	}

	.button-item:not(:last-child) {
		margin-bottom: 20px;
	}

	.MuiMenuItem-root {
		background: red;
	}

	.MuiFormControl-root {
		margin-bottom: 40px;
	}

	.MuiSelect-select-root:before {
		display: none;
	}

	.MuiSelect-select {
		font-family: Circe, sans-serif;
		font-size: 18px;
		box-sizing: border-box;
		min-height: calc(1.5em + 22px);
		/* width: 280px; */
		border-bottom: 1px solid ${vars.color.accent.buttonOpenMenu};
		background: #ffffff;
		padding: 10px 0;
		text-align: left;
		line-height: 1.5;
		color: ${vars.color.accent.buttonOpenMenu};
		&:hover {
			border-bottom: 1px solid ${vars.color.accent.buttonOpenMenu};
		}
		&:hover,
		&:focus,
		&:active {
			background: #ffffff;
			border-bottom: 1px solid ${vars.color.accent.buttonOpenMenu};
		}
	}

	/* .MuiSelect-filled {
    width: 400px;
    background: red;
    border: none;
    outline: none;
  } */

	Select {
		margin-bottom: 40px;
		padding-left: 20px;
		width: 100%;
		border: none;
		border-bottom: 1px solid red;
		outline: none;
		font-size: 18px;
		line-height: 1.5;

		@media screen and (min-width: 768px) {
			width: 394px;
		}
		option {
			background-color: yellow;
			font-size: 18px;
		}
	}

	.switchContainer {
		margin-bottom: 40px;
	}

	.MuiFormControl-root {
		width: 100%;
	}

	// select {
	// 	margin-bottom: 40px;
	// 	padding-left: 20px;
	// 	width: 100%;

	// 	font-size: 18px;
	// 	line-height: 1.5;

	// 	@media screen and (min-width: 768px) {
	// 		width: 394px;
	// 	}
	// }

	.error-message {
		color: ${vars.color.font.negative};
	}
`

export const AddTransaction = () => {
	// const [character, setCharacter] = useState(characters[0])
	const [date, setDate] = useState(new Date())
	const [category, setCategory] = useState('628356e997d487932b456343')

	console.log(category)
	const dispatch = useDispatch()

	const handleChange = (event) => {
		const name = event.target.name
		setState({
			...state,
			[name]: event.target.value,
		})
	}
	const [state, setState] = useState({
		age: '',
		name: 'hai',
	})

	const useStyles = makeStyles((theme) => ({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	}))
	const classes = useStyles()
	const closeModal = () => {
		dispatch(setCloseModal())
	}
	const postTransaction = (body) => {
		dispatch(zuzuzu(body))
	}

	const categories = useSelector(selectorsFinance.getCategories)
	const updtdCategories = categories.filter((cat) => cat.name !== 'Income')

	const handleDateChange = ({ _d: time }) => setDate(time)

	const addTransaction = async (values) => {
		if (values.isIncome) values.category = '628587f997d487932b456397'

		const type = values.isIncome ? 'income' : 'outlay'
		values = { type, ...values, date }
		delete values.isIncome

		try {
			// await postTransaction(values)
			// await dispatch(resetFinance())
			// await dispatch(authOperations.fetchCurrentUser())
			// await dispatch(fetchTotalFinance())
			// await dispatch(fetchFinance())
		} catch (error) {
			console.log(error.message)
		}
		// closeModal()
		// console.log(values)

		await new Promise((resolve) => setTimeout(resolve, 500))
		alert(JSON.stringify(values, null, 2))
	}

	const transactionSchena = Yup.object().shape({
		isIncome: Yup.boolean().required('Required'),
		category: Yup.string(),
		sum: Yup.number().required('Sum is Required'),
		date: Yup.date().required('Required'),
		comment: Yup.string(),
	})

	return (
		<FormContainer className='addTransaction'>
			<Title>Add transaction</Title>
			<Formik
				initialValues={{ isIncome: false, category, sum: '', date, comment: '' }}
				onSubmit={addTransaction}
				validationSchema={transactionSchena}
			>
				{({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setValues }) => (
					<form className='transactionForm' onSubmit={handleSubmit}>
						{/* <Field type='checkbox' name='isConsumption' onChange={handleChange} /> */}
						<Checkbox className='switch' isChecked={values.isIncome} func={handleChange} val={values.category} />
						{!values.isIncome && (
							<OpenMenu
								data={updtdCategories}
								val={values.category}
								func={(e) => setValues({ ...values, category: e })}
								lab='category'
							/>
						)}{' '}
						{/* <Box sx={{ minWidth: 394 }}> */}
						{/* <FormControl sx={{ m: 1, width: 300, mt: 3 }} className={classes.formControl}>
                  <Select value={values.category} name='category' variant='outlined' onChange={handleChange}>
                    {categories.map((category, index) => {
                      return (
                        <MenuItem value={category._id} key={index}>
                          {category.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl> */}
						{/* </Box> */}
						{/* {!values.isIncome && (
             
            )}{' '} */}
						{/* {values.isIncome && (
              <select name='category' onChange={handleChange}>
                <option value='' className='select-placeholder' disabled selected hidden>
                  choose category
                </option>
                {categories.map((category, index) => {
                  return (
                    <option value={category._id} key={index}>
                      {category.name}
                    </option>
                  )
                })}
              </select>
            )} */}
						{/* {errors.category && touched.category && <div className='input-feedback'>{errors.category}</div>} */}
						{errors.category && touched.category && errors.category}
						<StyledGroup className='group'>
							<SummInput
								type='number'
								name='sum'
								min='0'
								step='0,01'
								placeholder='0.00'
								value={values.sum}
								onChange={handleChange}
								onBlur={handleBlur}
								className={['summInput', errors.sum && touched.sum ? 'error' : null].join(' ')}
							/>
							{/* {errors.sum && touched.sum && errors.sum} */}
							{/* <ErrorMessage name='sum' component='div' /> */}
							<span className='dateInputWrapper'>
								<Datetime
									name='date'
									dateFormat='DD.MM.YYYY'
									timeFormat={false}
									initialValue={values.date}
									// updateOnView='time'
									closeOnSelect={true}
									onChange={handleDateChange}
								/>

								<svg className='calendarIcon' width='24' height='24'>
									<use href={sprite + '#icon-calendar'}></use>
								</svg>
							</span>
						</StyledGroup>
						{errors.date && touched.date && errors.date}
						<StyledTextarea
							type='text'
							name='comment'
							value={values.comment}
							placeholder='Comment'
							autoComplete='off'
							onChange={handleChange}
						/>
						<ErrorMessage name='sum' className='error-message' component='div' />
						{/* {errors.sum && touched.sum && <div className='error-message'>{errors.sum}</div>} */}
						<ul className='button-list'>
							<li className='button-item'>
								<Button type='submit' disabled={isSubmitting}>
									Add
								</Button>
							</li>
							<li className='button-item'>
								<Button type='button' color={false} onClickButton={closeModal}>
									Cancel
								</Button>
							</li>
						</ul>
						<pre>{JSON.stringify(values, null, 2)}</pre>
					</form>
				)}
			</Formik>
		</FormContainer>
	)
}
