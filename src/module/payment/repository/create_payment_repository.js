const createPaymentPixRepository = (axios) => async (data) => {
  try {
    console.log(axios, data);
    
    const response = await axios.post(`/pix`,
      data
    )
    return response.data
  } catch (err) {
    throw err
  }
}

export default createPaymentPixRepository