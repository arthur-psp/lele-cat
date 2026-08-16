const createSimulatePaymentPixRepository = (axios) => async (id) => {
  try {
    const response = await axios.post(`/pix/${id}/simulate`)
    return response.data
  } catch (err) {
    throw err
  }
}

export default createSimulatePaymentPixRepository