const createOrderRepository = (axios) => async (data) => {
  try {
    const response = await axios.post(`/order`,
      data
    )
    return response.data
  } catch (err) {
    throw err
  }
}

export default createOrderRepository