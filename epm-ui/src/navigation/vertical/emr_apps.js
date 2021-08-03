import React from "react"
import { Mail, CheckSquare, FileText, Circle, Users, Settings, Server } from 'react-feather'


export default [
	{
		id: 'patients',
		title: 'Patients',
		icon: <Users size={20} />,
		children: [
			{
				id: 'patientNew',
				title: 'New',
				icon: <Circle size={12} />,
				navLink: '/patient/new'
			},
			{
				id: 'patientVisit',
				title: 'Visit',
				icon: <Circle size={12} />,
				navLink: '/patient/visit'
			},
			{
				id: 'patientSearch',
				title: 'Search',
				icon: <Circle size={12} />,
				navLink: '/patient/search'
			},
			{
				id: 'patientReview',
				title: 'Patient Review',
				icon: <Circle size={12} />,
				navLink: '/patient/review'
			}
		]
	},
	{
		id: 'documents',
		title: 'Documents',
		icon: <FileText Page size={20} />,
		navLink: '/document/list'
	},
	{
		id: 'messages',
		title: 'Messages',
		icon: <Mail Page size={20} />,
		navLink: '/apps/email'
	},
	{
		id: 'tasks',
		title: 'Tasks',
		icon: <CheckSquare Page size={20} />,
		navLink: '/apps/todo'
	},
	{
		id: 'administration',
		title: 'Administration',
		icon: <Server Page size={20} />,
		navLink: '/apps/administration'
	},
	{
		id: 'settings',
		title: 'Settings',
		icon: <Settings Page size={20} />,
		navLink: '/apps/settings'
	}
]
