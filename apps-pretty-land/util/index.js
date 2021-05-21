export const snapshotToArray = (snapshot) => {
  const returnArr = []
  snapshot.forEach((childSnapshot) => {
    const item = childSnapshot.val()
    item.key = childSnapshot.key

    returnArr.push(item)
  })

  return returnArr
}

export const getChildFromSnapshot = (snapshot, id) => {
  snapshot.forEach((childSnapshot) => {
    childSnapshot.forEach((obj) => {
      if (obj.id === id) {
        return childSnapshot
      }
    })
  })
}
