import { defineStore } from 'pinia';

interface ObjectList {
	[key: string]: string[];
}

export const usePermissStore = defineStore('permiss', {
	state: () => {
		const keys = localStorage.getItem('ms_keys');
		return {
			key: keys ? JSON.parse(keys) : <string[]>[],
			defaultList: <ObjectList>{
				admin: ['testcase', 'case-generation', 'jmx', 'csv', 'jar', 'execution', 'report', 'node', 'config', 'user', 'role', 'audit'],
				demo: ['testcase', 'case-generation', 'jmx', 'csv', 'jar', 'execution', 'report']
			}
		};
	},
	actions: {
		handleSet(val: string[]) {
			this.key = val;
			localStorage.setItem('ms_keys', JSON.stringify(val));
		}
	}
});
