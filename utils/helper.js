module.exports={
    createResponse: (res, status, message, payload = {}, pager, header) => {
      pager = typeof pager !== 'undefined' ? pager : {};
      header = typeof header !== 'undefined' ? header : {};
      return res
        .status(status)
        .set(header)
        .json({
          status: status,
          message: message,
          payload: payload,
          pager: pager
        });
    },
  }
    