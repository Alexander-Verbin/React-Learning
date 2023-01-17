export const updateObjectInArray = (items,objPropName,itemId,newObjPrors) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjPrors};
        }
        return u;
    })
}