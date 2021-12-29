//规则集中管理
export default  function(data){
	return {
		//姓名
		name: [{ required: true, message: '请输入姓名', }],
		//电话
		phone:[{
			required: true,
			message: '请输入正确且无重复手机号', 
			validator: (rule, value, callback) => {
				// return value.every(v => uni.$u.test.mobile(v.value)) 全号验证
				//数组去重 看是否长度不变 
				// 方法一:
				let list = new Set()
				value.forEach(v => list.add(v.value))
				// 方法二
				// let list = value.reduce((list,v)=>{
				// 	console.log(v)
				// 	if(!list.includes(v.value)){
				// 		list.push(v.value)
				// 	}
				// 	return list
				// },[])
				// console.log([...list].length)
				return value.every(v => v.value.length === 11) && ([...list].length ===  value.length)
			},
		}],
		//意向类型
		intentionLevel: [{ required: true, message: '请输入客户意向等级',}],
	}
}
//检测规则管理
export const commonTest = (value,msg) =>{
	if(!value){
		uni.$u.toast(msg,2000);
		return false
	}else{ return true }
}
export const phoneTest = (value) =>{
	if(!uni.$u.test.mobile(value)){
		uni.showToast({
			icon: 'none',
			duration: 2000,
			title: '请输入正确的电话号码'
		})
		return false
	}else { return true }
}