// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'
import {
	Badge,
	Media,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	UncontrolledDropdown
} from 'reactstrap'

import { getAllReviewData } from '@src/views/apps/patient/store/actions'
import { useDispatch, useSelector } from 'react-redux'

const NotificationDropdown = () => {
	const [notificationsArray, setNotificationsArray] = useState([])
	const [numNotifyLen, setNumNotifyLen] = useState(1)

	// ** Store Vars
	const dispatch = useDispatch()
	const store = useSelector(state => state.patient)

	useEffect(() => {
		dispatch(getAllReviewData())

		const tmpArray = store.allData.map((item) => {
			return (
				{
					img: require('@src/assets/images/avatars/avatar-blank.png').default,
					title: (
						<Link
							to={`/patient/review`}
							className='user-name text-truncate mb-0'
						>
							<Media tag='p' heading>
								<span className='font-weight-bolder'>New request</span>&nbsp;received
							</Media>
							{/*<span className='text-capitalize font-weight-bold'>{row.firstName.concat(" ", row.lastName)}</span>*/}
						</Link>
					),
					subtitle: `${item.profile.first_name} ${item.profile.last_name}`
				})
		})
		setNotificationsArray(tmpArray)
	}, [dispatch, store.allData.length])


	// ** Function to render Notifications
	/*eslint-disable */
	const renderNotificationItems = () => {
		return (
			<PerfectScrollbar
				component='li'
				className='media-list scrollable-container'
				options={{
					wheelPropagation: false
				}}
			>
				{notificationsArray.map((item, index) => {
					return (
						<a key={index} className='d-flex' href='/' onClick={e => e.preventDefault()}>
							<Media
								className={classnames('d-flex', {
									'align-items-start': !item.switch,
									'align-items-center': item.switch
								})}
							>
								{!item.switch ? (
									<Fragment>
										<Media left>
											<Avatar
												{...(item.img
													? { img: item.img, imgHeight: 32, imgWidth: 32 }
													: item.avatarContent
														? {
															content: item.avatarContent,
															color: item.color
														}
														: item.avatarIcon
															? {
																icon: item.avatarIcon,
																color: item.color
															}
															: null)}
											/>
										</Media>
										<Media body>
											{item.title}
											<small className='notification-text'>{item.subtitle}</small>
										</Media>
									</Fragment>
								) : (
									<Fragment>
										{item.title}
										{item.switch}
									</Fragment>
								)}
							</Media>
						</a>
					)
				})}
			</PerfectScrollbar>
		)
	}
	/*eslint-enable */

	return (
		<UncontrolledDropdown tag='li' className='dropdown-notification nav-item mr-25'>
			<DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
				<Bell size={21} />
				{(notificationsArray.length > 0) &&
					<Badge pill color='danger' className='badge-up'>
						{notificationsArray.length}
					</Badge>}
			</DropdownToggle>
			<DropdownMenu tag='ul' right className='dropdown-menu-media mt-0'>
				<li className='dropdown-menu-header'>
					<DropdownItem className='d-flex' tag='div' header>
						<h4 className='notification-title mb-0 mr-auto'>Notifications</h4>
						<Badge tag='div' color='light-primary' pill>
							{notificationsArray.length} New
						</Badge>
					</DropdownItem>
				</li>
				{renderNotificationItems()}
				{/*<li className='dropdown-menu-footer'>*/}
				{/*  <Button.Ripple color='primary' block>*/}
				{/*    Read all notifications*/}
				{/*  </Button.Ripple>*/}
				{/*</li>*/}
			</DropdownMenu>
		</UncontrolledDropdown>
	)
}

export default NotificationDropdown
