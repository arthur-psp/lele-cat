const getPaymentStatusByIdRepository = (axios) => async (id) => {
  try {
    const response = await axios.get(`/pix/${id}`)
    return response.data
  } catch (err) {
    throw err
  }
}

export default getPaymentStatusByIdRepository
