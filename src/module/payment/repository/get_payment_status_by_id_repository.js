const getPaymentStatusByIdRepository = (axios) => async (id) => {
  try {
    const response = await axios.post(`/pix/${id}`)
    return response.data
  } catch (err) {
    throw err
  }
}

export default getPaymentStatusByIdRepository
