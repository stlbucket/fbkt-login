"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');

const getOrganizationsAndUsers = require('./getOrganizationsAndUsers');
const getUserLicensesConfig = require('./getUserLicensesConfig');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'fbktLogin/db/loadBuildDbDataNotOptional/loadOrganizationsAndUsers/getOrganizationsToLoad',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {
			"organizationsAndUsers": "getOrganizationsAndUsers",
			"userLicensesConfig":    "getUserLicensesConfig"
		},
		pipelineSteps:  {
			"getOrganizationsAndUsers": getOrganizationsAndUsers,
			"getUserLicensesConfig":    getUserLicensesConfig,
			"mapToOutput":              (callInfo)=> {
				const userLicensesConfig = callInfo.params.userLicensesConfig;

				return R.reject(org=>{ 
					return org.contacts.length < 1;
				}, R.map(
					(organization)=> {
						const contacts = R.reject((contact)=> {
							return contact.licenses.length === 0;
						}, R.map(
							(contact)=> {
								const licenses = R.reject(R.isNil, R.reduce(
									(acc, licenseTypeKey)=> {
										const license = R.find(
											(license)=> {
												return license.email === contact.email;
											},
											userLicensesConfig[licenseTypeKey]
										);
										return license
											? R.concat(acc, [{
											licenseOrganizationName: organization.name,
											licenseType:             {licenseTypeKey: licenseTypeKey}
										}])
											: acc;
									},
									[],
									R.keys(userLicensesConfig)
								));

								return R.merge(contact, {licenses: licenses});
							},
							organization.contacts
						));
						return R.merge(
							R.merge(
								R.omit('contacts', organization),
								{
									useDefaultPassword: true
								}
							),
							{contacts: contacts}
						);
					},
					callInfo.params.organizationsAndUsers
				));
			}
		}
	}, callInfo || {});
};